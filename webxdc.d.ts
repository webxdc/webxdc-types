export type SendingStatusUpdate<PayloadType> = {
  /** the payload, deserialized json:
   * any javascript primitive, array or object. */
  payload: PayloadType;
  /** optional, short, informational message that will be added to the chat,
   * eg. "Alice voted" or "Bob scored 123 in MyGame";
   * usually only one line of text is shown,
   * use this option sparingly to not spam the chat. */
  info?: string;
  /** optional, if the Webxdc creates a document, you can set this to the name of the document;
   * do not set if the Webxdc does not create a document */
  document?: string;
  /** optional, short text, shown beside the icon;
   * it is recommended to use some aggregated value,
   * eg. "8 votes", "Highscore: 123" */
  summary?: string;
  /** optional, a string that specifies a relative URL.
      When a receiver starts the webxdc app based on the update object
      the app will be navigated to the `href` location with the application
      root url prepended. Example: `index.html#about`
    */
  href?: string;
  /** optional, dictionary mapping an address to a text that should be shown
      as a user-visible notification to the addressed user.
      The optional special key "*" serves as a catch-all address
      whose text shall be notified on the receiver side if `selfAddr` is not
      contained in the dictionary
    */
  notify?: { [key: string]: string };
};

export type ReceivedStatusUpdate<PayloadType> = SendingStatusUpdate<PayloadType> & {
  /** the serial number of this update. Serials are larger than 0 and newer serials have higher numbers */
  serial: number;
  /** the maximum serial currently known */
  max_serial: number;
};

export type XDCFile = {
  /** name of the file, including extension */
  name: string;
} & (
  | {
      /** Blob, also accepts inherit types like File */
      blob: Blob;
    }
  | {
      /** base64 encoded file data */
      base64: string;
    }
  | {
      /** text for textfile, will be encoded as utf8 */
      plainText: string;
    }
);

type SendOptions =
  | {
      file: XDCFile;
      text?: string;
    }
  | {
      file?: XDCFile;
      text: string;
    };

/**
 * A listener for realtime data.
 */
export interface RealtimeListener {
  /* Set a listener for the realtime channel */
  setListener(listener: (data: Uint8Array) => void): void;
  /* Send data over the realtime channel */
  send(data: Uint8Array): void;
  /* Leave the realtime channel */
  leave(): void;
}

export interface Webxdc<StatusPayload> {
  /** Returns the peer's own address.
   *  This is esp. useful if you want to differ between different peers - just send the address along with the payload,
   *  and, if needed, compare the payload addresses against selfAddr() later on. */
  selfAddr: string;
  /** Returns the peer's own name. This is name chosen by the user in their settings, if there is nothing set, that defaults to the peer's address. */
  selfName: string;
  /** Indicates the number of milliseconds to wait for before calling
      {@link sendUpdate} again since the last call. If the webxdc app calls
      {@link sendUpdate} earlier than the specified interval the messaging layer
      may delay updates for much longer than the interval. */
  sendUpdateInterval: number;
  /** is the maximum number of bytes that the messaging layer will accept
      for a serialized `update` object passed into a {@link sendUpdate} invocation.
    */
  sendUpdateMaxSize: number;
  /**
   * set a listener for new status updates.
   * The "serial" specifies the last serial that you know about (defaults to 0).
   * Note that own status updates, that you send with {@link sendUpdate}, also trigger this method
   * @returns promise that resolves when the listener has processed all the update messages known at the time when {@link setUpdateListener} was called.
   * */
  setUpdateListener(
    cb: (statusUpdate: ReceivedStatusUpdate<StatusPayload>) => void,
    serial?: number,
  ): Promise<void>;

  /**
   * Join a realtime channel.
   * @throws Calling this function a second time
   * without leaving the previous channel will throw an error.
   */
  joinRealtimeChannel(): RealtimeListener;

  /**
   * @deprecated See {@link setUpdateListener|`setUpdateListener()`}.
   */
  getAllUpdates(): Promise<ReceivedStatusUpdate<StatusPayload>[]>;
  /**
   * Webxdc are usually shared in a chat and run independently on each peer. To get a shared status, the peers use sendUpdate() to send updates to each other.
   * @param update status update to send
   * @param description Deprecated but must be an empty string for backwards compatibility
   */
  sendUpdate(update: SendingStatusUpdate<StatusPayload>, description: ""): void;
  /**
   * Send a message with file, text or both to a chat.
   * Asks user to what Chat to send the message to.
   * May exit the xdc, please save your app state before calling this function.
   * @param message
   * @returns promise that may not resolve (because the xdc closes) and is rejected on error.
   */
  sendToChat(message: SendOptions): Promise<void>;
  /**
   * Asks the user to choose files.
   * This either opens a normal file picker (like `<input type=file>`) or an integrated Filepicker if the ui has implemented it.
   * This custom file picker should show files that were recently send or received in chats,
   * but also show a button to open the normal file picker.
   */
  importFiles(filter: {
    /**
     * Only show files with these extensions.
     * All extensions need to start with a dot and have the format `.ext`. */
    extensions?: string[];
    /**
     * Mime types as in https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept#unique_file_type_specifiers
     * Specifying a mime type requires to list all typical extensions as well.
     */
    mimeTypes?: string[];
    /** Whether to allow multiple files to be selected, false by default */
    multiple?: boolean;
  }): Promise<File[]>;
}
