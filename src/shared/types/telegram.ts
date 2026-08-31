export type ColorScheme = 'light' | 'dark';

export type BottomButtonType = 'main' | 'secondary';

export type BottomButtonPosition = 'left' | 'right' | 'top' | 'bottom';

export type BiometricType = 'finger' | 'face' | 'unknown';

export type HapticImpactStyle = 'light' | 'medium' | 'heavy' | 'rigid' | 'soft';

export type HapticNotificationType = 'error' | 'success' | 'warning';

export type PopupButtonType = 'default' | 'ok' | 'close' | 'cancel' | 'destructive';

export type HomeScreenStatus = 'unsupported' | 'unknown' | 'added' | 'missed';

export type FullscreenError = 'UNSUPPORTED' | 'ALREADY_FULLSCREEN';

export type WriteAccessStatus = 'allowed' | 'cancelled';

export type ContactRequestStatus = 'sent' | 'cancelled';

export type InvoiceStatus = 'paid' | 'cancelled' | 'failed' | 'pending';

export type EmojiStatusAccessStatus = 'allowed' | 'cancelled';

export type FileDownloadStatus = 'downloading' | 'cancelled';

export type ShareMessageError =
  | 'UNSUPPORTED'
  | 'MESSAGE_EXPIRED'
  | 'MESSAGE_SEND_FAILED'
  | 'USER_DECLINED'
  | 'UNKNOWN_ERROR';

export type EmojiStatusError =
  | 'UNSUPPORTED'
  | 'SUGGESTED_EMOJI_INVALID'
  | 'DURATION_INVALID'
  | 'USER_DECLINED'
  | 'SERVER_ERROR'
  | 'UNKNOWN_ERROR';

export type DeviceMotionError = 'UNSUPPORTED';

export interface ThemeParams {
  bg_color?: string;
  text_color?: string;
  hint_color?: string;
  link_color?: string;
  button_color?: string;
  button_text_color?: string;
  secondary_bg_color?: string;
  header_bg_color?: string;
  bottom_bar_bg_color?: string;
  accent_text_color?: string;
  section_bg_color?: string;
  section_header_text_color?: string;
  section_separator_color?: string;
  subtitle_text_color?: string;
  destructive_text_color?: string;
}

export interface WebAppUser {
  id: number;
  is_bot?: true;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: true;
  added_to_attachment_menu?: true;
  allows_write_to_pm?: true;
  photo_url?: string;
}

export interface WebAppChat {
  id: number;
  type: 'group' | 'supergroup' | 'channel';
  title: string;
  username?: string;
  photo_url?: string;
}

export interface WebAppInitData {
  query_id?: string;
  chat_join_request_query_id?: string;
  user?: WebAppUser;
  receiver?: WebAppUser;
  chat?: WebAppChat;
  chat_type?: string;
  chat_instance?: string;
  start_param?: string;
  can_send_after?: number;
  auth_date: number;
  hash: string;
  signature?: string;
}

export interface SafeAreaInset {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export interface ContentSafeAreaInset {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export interface StoryWidgetLink {
  url: string;
  name?: string;
}

export interface StoryShareParams {
  text?: string;
  widget_link?: StoryWidgetLink;
}

export interface ScanQrPopupParams {
  text?: string;
}

export interface PopupButton {
  id?: string;
  type?: PopupButtonType;
  text?: string;
}

export interface PopupParams {
  title?: string;
  message: string;
  buttons?: PopupButton[];
}

export interface EmojiStatusParams {
  duration?: number;
}

export interface DownloadFileParams {
  url: string;
  file_name: string;
}

export interface BiometricRequestAccessParams {
  reason?: string;
}

export interface BiometricAuthenticateParams {
  reason?: string;
}

export interface AccelerometerStartParams {
  refresh_rate?: number;
}

export interface DeviceOrientationStartParams {
  refresh_rate?: number;
  need_absolute?: boolean;
}

export interface BackButton {
  isVisible: boolean;

  onClick(callback: () => void): BackButton;
  offClick(callback: () => void): BackButton;
  show(): BackButton;
  hide(): BackButton;
}

export interface BottomButtonParams {
  icon_custom_emoji_id?: string;
  text?: string;
  color?: string;
  text_color?: string;
  has_shine_effect?: boolean;
  position?: BottomButtonPosition;
  is_active?: boolean;
  is_visible?: boolean;
}

export interface BottomButton {
  readonly type: BottomButtonType;
  iconCustomEmojiId: string;
  text: string;
  color: string;
  textColor: string;
  isVisible: boolean;
  isActive: boolean;
  hasShineEffect: boolean;
  position: BottomButtonPosition;
  readonly isProgressVisible: boolean;

  setText(text: string): BottomButton;
  onClick(callback: () => void): BottomButton;
  offClick(callback: () => void): BottomButton;
  show(): BottomButton;
  hide(): BottomButton;
  enable(): BottomButton;
  disable(): BottomButton;
  showProgress(leaveActive?: boolean): BottomButton;
  hideProgress(): BottomButton;
  setParams(params: BottomButtonParams): BottomButton;
}

export interface SettingsButton {
  isVisible: boolean;

  onClick(callback: () => void): SettingsButton;
  offClick(callback: () => void): SettingsButton;
  show(): SettingsButton;
  hide(): SettingsButton;
}

export interface HapticFeedback {
  impactOccurred(style: HapticImpactStyle): HapticFeedback;
  notificationOccurred(type: HapticNotificationType): HapticFeedback;
  selectionChanged(): HapticFeedback;
}

export interface CloudStorage {
  setItem(
    key: string,
    value: string,
    callback?: (error: string | null, success: boolean) => void,
  ): CloudStorage;

  getItem(key: string, callback: (error: string | null, value: string) => void): CloudStorage;

  getItems(
    keys: string[],
    callback: (error: string | null, values: Record<string, string>) => void,
  ): CloudStorage;

  removeItem(
    key: string,
    callback?: (error: string | null, success: boolean) => void,
  ): CloudStorage;

  removeItems(
    keys: string[],
    callback?: (error: string | null, success: boolean) => void,
  ): CloudStorage;

  getKeys(callback: (error: string | null, keys: string[]) => void): CloudStorage;
}

export interface BiometricManager {
  isInited: boolean;
  isBiometricAvailable: boolean;
  biometricType: BiometricType;
  isAccessRequested: boolean;
  isAccessGranted: boolean;
  isBiometricTokenSaved: boolean;
  deviceId: string;

  init(callback?: () => void): BiometricManager;

  requestAccess(
    params: BiometricRequestAccessParams,
    callback?: (granted: boolean) => void,
  ): BiometricManager;

  authenticate(
    params: BiometricAuthenticateParams,
    callback?: (authenticated: boolean, biometricToken?: string) => void,
  ): BiometricManager;

  updateBiometricToken(token: string, callback?: (updated: boolean) => void): BiometricManager;

  openSettings(): BiometricManager;
}

export interface Accelerometer {
  isStarted: boolean;
  x: number;
  y: number;
  z: number;

  start(params: AccelerometerStartParams, callback?: (started: boolean) => void): Accelerometer;

  stop(callback?: (stopped: boolean) => void): Accelerometer;
}

export interface DeviceOrientation {
  isStarted: boolean;
  absolute: boolean;
  alpha: number;
  beta: number;
  gamma: number;

  start(
    params: DeviceOrientationStartParams,
    callback?: (started: boolean) => void,
  ): DeviceOrientation;

  stop(callback?: (stopped: boolean) => void): DeviceOrientation;
}

export interface Gyroscope {
  isStarted: boolean;
  x: number;
  y: number;
  z: number;

  start(params: AccelerometerStartParams, callback?: (started: boolean) => void): Gyroscope;

  stop(callback?: (stopped: boolean) => void): Gyroscope;
}

export interface LocationData {
  latitude: number;
  longitude: number;
  altitude?: number;
  course?: number;
  speed?: number;
  horizontal_accuracy?: number;
  vertical_accuracy?: number;
  course_accuracy?: number;
  speed_accuracy?: number;
}

export interface LocationManager {
  isInited: boolean;
  isLocationAvailable: boolean;
  isAccessRequested: boolean;
  isAccessGranted: boolean;

  init(callback?: () => void): LocationManager;

  getLocation(callback: (location: LocationData | null) => void): LocationManager;

  openSettings(): LocationManager;
}

export interface DeviceStorage {
  setItem(
    key: string,
    value: string,
    callback?: (error: string | null, success: boolean) => void,
  ): DeviceStorage;

  getItem(
    key: string,
    callback: (error: string | null, value: string | null) => void,
  ): DeviceStorage;

  removeItem(
    key: string,
    callback?: (error: string | null, success: boolean) => void,
  ): DeviceStorage;

  clear(callback?: (error: string | null, success: boolean) => void): DeviceStorage;
}

export interface SecureStorage {
  setItem(
    key: string,
    value: string,
    callback?: (error: string | null, success: boolean) => void,
  ): SecureStorage;

  getItem(
    key: string,
    callback: (error: string | null, value: string | null, canRestore?: boolean) => void,
  ): SecureStorage;

  restoreItem(
    key: string,
    callback?: (error: string | null, value?: string) => void,
  ): SecureStorage;

  removeItem(
    key: string,
    callback?: (error: string | null, success: boolean) => void,
  ): SecureStorage;

  clear(callback?: (error: string | null, success: boolean) => void): SecureStorage;
}

export interface TelegramEventMap {
  activated: undefined;
  deactivated: undefined;
  themeChanged: undefined;
  viewportChanged: {
    isStateStable: boolean;
  };
  safeAreaChanged: undefined;
  contentSafeAreaChanged: undefined;
  mainButtonClicked: undefined;
  secondaryButtonClicked: undefined;
  backButtonClicked: undefined;
  settingsButtonClicked: undefined;
  invoiceClosed: {
    url: string;
    status: InvoiceStatus;
  };
  popupClosed: {
    button_id: string | null;
  };
  qrTextReceived: {
    data: string;
  };
  scanQrPopupClosed: undefined;
  clipboardTextReceived: {
    data: string | null;
  };
  writeAccessRequested: {
    status: WriteAccessStatus;
  };
  contactRequested: {
    status: ContactRequestStatus;
  };
  biometricManagerUpdated: undefined;
  biometricAuthRequested: {
    isAuthenticated: boolean;
    biometricToken?: string;
  };
  biometricTokenUpdated: {
    isUpdated: boolean;
  };
  fullscreenChanged: undefined;
  fullscreenFailed: {
    error: FullscreenError;
  };
  homeScreenAdded: undefined;
  homeScreenChecked: {
    status: HomeScreenStatus;
  };
  accelerometerStarted: undefined;
  accelerometerStopped: undefined;
  accelerometerChanged: undefined;
  accelerometerFailed: {
    error: DeviceMotionError;
  };
  deviceOrientationStarted: undefined;
  deviceOrientationStopped: undefined;
  deviceOrientationChanged: undefined;
  deviceOrientationFailed: {
    error: DeviceMotionError;
  };
  gyroscopeStarted: undefined;
  gyroscopeStopped: undefined;
  gyroscopeChanged: undefined;
  gyroscopeFailed: {
    error: DeviceMotionError;
  };
  locationManagerUpdated: undefined;
  locationRequested: {
    locationData: LocationData;
  };
  shareMessageSent: undefined;
  shareMessageFailed: {
    error: ShareMessageError;
  };
  emojiStatusSet: undefined;
  emojiStatusFailed: {
    error: EmojiStatusError;
  };
  emojiStatusAccessRequested: {
    status: EmojiStatusAccessStatus;
  };
  fileDownloadRequested: {
    status: FileDownloadStatus;
  };
}

export interface WebApp {
  initData: string;
  initDataUnsafe: WebAppInitData;
  version: string;
  platform: string;
  colorScheme: ColorScheme;
  themeParams: ThemeParams;
  isActive: boolean;
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;
  headerColor: string;
  backgroundColor: string;
  bottomBarColor: string;
  isClosingConfirmationEnabled: boolean;
  isVerticalSwipesEnabled: boolean;
  isFullscreen: boolean;
  isOrientationLocked: boolean;
  safeAreaInset: SafeAreaInset;
  contentSafeAreaInset: ContentSafeAreaInset;

  BackButton: BackButton;
  MainButton: BottomButton;
  SecondaryButton: BottomButton;
  SettingsButton: SettingsButton;
  HapticFeedback: HapticFeedback;
  CloudStorage: CloudStorage;
  BiometricManager: BiometricManager;
  Accelerometer: Accelerometer;
  DeviceOrientation: DeviceOrientation;
  Gyroscope: Gyroscope;
  LocationManager: LocationManager;
  DeviceStorage: DeviceStorage;
  SecureStorage: SecureStorage;

  isVersionAtLeast(version: string): boolean;

  setHeaderColor(color: string): void;
  setBackgroundColor(color: string): void;
  setBottomBarColor(color: string): void;
  enableClosingConfirmation(): void;
  disableClosingConfirmation(): void;
  enableVerticalSwipes(): void;
  disableVerticalSwipes(): void;
  requestFullscreen(): void;
  exitFullscreen(): void;
  lockOrientation(): void;
  unlockOrientation(): void;
  addToHomeScreen(): void;
  checkHomeScreenStatus(callback?: (status: HomeScreenStatus) => void): void;

  onEvent<K extends keyof TelegramEventMap>(
    eventType: K,
    eventHandler: (
      ...args: TelegramEventMap[K] extends undefined ? [] : [TelegramEventMap[K]]
    ) => void,
  ): void;

  offEvent<K extends keyof TelegramEventMap>(
    eventType: K,
    eventHandler: (
      ...args: TelegramEventMap[K] extends undefined ? [] : [TelegramEventMap[K]]
    ) => void,
  ): void;

  sendData(data: string): void;

  switchInlineQuery(
    query: string,
    chooseChatTypes?: Array<'users' | 'bots' | 'groups' | 'channels'>,
  ): void;

  openLink(
    url: string,
    options?: {
      try_instant_view?: boolean;
    },
  ): void;

  openTelegramLink(url: string): void;

  openInvoice(url: string, callback?: (status: InvoiceStatus) => void): void;

  shareToStory(mediaUrl: string, params?: StoryShareParams): void;

  shareMessage(msgId: number, callback?: (sent: boolean) => void): void;

  setEmojiStatus(
    customEmojiId: string,
    params?: EmojiStatusParams,
    callback?: (success: boolean) => void,
  ): void;

  requestEmojiStatusAccess(callback?: (granted: boolean) => void): void;

  downloadFile(params: DownloadFileParams, callback?: (accepted: boolean) => void): void;

  hideKeyboard(): void;

  showPopup(params: PopupParams, callback?: (buttonId: string) => void): void;

  showAlert(message: string, callback?: () => void): void;

  showConfirm(message: string, callback?: (confirmed: boolean) => void): void;

  showScanQrPopup(params: ScanQrPopupParams, callback?: (text: string) => boolean): void;

  closeScanQrPopup(): void;

  readTextFromClipboard(callback?: (text: string) => void): void;

  requestWriteAccess(callback?: (granted: boolean) => void): void;

  requestContact(callback?: (granted: boolean) => void): void;

  requestChat(reqId: number, callback?: (sent: boolean) => void): void;

  ready(): void;

  expand(): void;

  close(): void;
}

declare global {
  interface Window {
    Telegram?: {
      WebApp?: WebApp;
    };
  }
}
