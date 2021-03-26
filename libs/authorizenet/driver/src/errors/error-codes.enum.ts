/**
 * The error codes for Authorize.net driver errors.
 * See {@link DaffError} and {@link DaffStateError}.
 */
export enum DaffAuthorizeNetDriverErrorCodes {
  ACCEPTJS_INVALID = 'DAFF_AUTHORIZE_NET_ACCEPTJS_INVALID',
  ACCEPTJS_MISSING = 'DAFF_AUTHORIZE_NET_ACCEPTJS_MISSING',
  AUTH_FAILED = 'DAFF_AUTHORIZE_NET_AUTH_FAILED',
  INPUT_MISSING = 'DAFF_AUTHORIZE_NET_INPUT_MISSING',
  INSECURE_CONNECTION = 'DAFF_AUTHORIZE_NET_INSECURE_CONNECTION',
  INVALID_API_RESPONSE = 'DAFF_AUTHORIZE_NET_ACCEPTJS_INVALID',
  INVALID_CC_CVV = 'DAFF_AUTHORIZE_NET_INVALID_CC_CVV',
  INVALID_CC_EXP_MONTH = 'DAFF_AUTHORIZE_NET_INVALID_CC_EXP_MONTH',
  INVALID_CC_EXP_YEAR = 'DAFF_AUTHORIZE_NET_INVALID_CC_EXP_YEAR',
  INVALID_CC_NAME = 'DAFF_AUTHORIZE_NET_INVALID_CC_NAME',
  INVALID_CC_NUMBER = 'DAFF_AUTHORIZE_NET_INVALID_CC_NUMBER',
  INVALID_CLIENT_KEY = 'DAFF_AUTHORIZE_NET_INVALID_CLIENT_KEY',
  INVALID_LOGIN_ID = 'DAFF_AUTHORIZE_NET_INVALID_LOGIN_ID',
  INVALID_POSTAL_CODE = 'DAFF_AUTHORIZE_NET_INVALID_POSTAL_CODE',
  PAST_CC_EXPIRATION = 'DAFF_AUTHORIZE_NET_PAST_CC_EXPIRATION',
}