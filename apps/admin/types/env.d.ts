interface ImportMetaEnv {
  readonly REACT_APP_HOST_URL: string
  readonly REACT_APP_API_URL: string
  readonly REACT_APP_WEB_URL: string
  readonly REACT_APP_TINYMCE_API_KEY: string
  readonly REACT_APP_ALIYUN_OSS_DOMAIN: string
  readonly REACT_APP_REDUX_LOGGER: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
