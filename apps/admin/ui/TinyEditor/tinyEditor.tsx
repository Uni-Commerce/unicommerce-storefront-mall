import { Editor } from '@tinymce/tinymce-react'
import { useSelector } from 'react-redux'
import type { IAllProps } from '@tinymce/tinymce-react'

interface TinyEditorProps extends IAllProps {
  tagsList?: any[]
}

const TinyEditor: React.FC<TinyEditorProps> = ({ tagsList = [], ...props }) => {
  const isWechat = useSelector((state: Store) => state.app.isWechat)
  const apiKey: string = import.meta.env.REACT_APP_TINYMCE_API_KEY
  const compatibleTag: string = isWechat ? 'compatible' : 'tinymce'

  return (
    <Editor
      apiKey={apiKey}
      init={{
        plugins:
          'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks mergetags wordcount code',
        toolbar:
          'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags  | spellcheckdialog typography | align lineheight | numlist bullist indent outdent | emoticons charmap code | removeformat',
        font_size_input_default_unit: 'px',
        font_size_formats:
          '12px 14px 16px 18px 20px 22px 24px 26px 28px 30px 32px 34px 36px 38px 40px 42px 46px 48px',
        mergetags_prefix: '<%= ',
        mergetags_suffix: ' %>',
        mergetags_list: tagsList,
        branding: false,
        promotion: false,
        language: 'zh_CN',
        language_url: `/assets/js/${compatibleTag}/langs/zh_CN.js?v=1.0`,
        mobile: {
          menubar: true
        },
        ...(props?.init ?? {})
      }}
      tinymceScriptSrc={`/assets/js/${compatibleTag}/tinymce.min.js`}
      {...props}
    />
  )
}

export default TinyEditor
