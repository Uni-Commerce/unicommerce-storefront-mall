import { useState } from 'react'
import { Button, Modal, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import type { UploadFile, UploadProps, UploadChangeParam } from 'antd/es/upload/interface'

interface BusinessUploadProps extends Omit<UploadProps, 'onChange'> {
  children?: React.ReactNode
  fileList?: UploadFile[]
  onChange?: (fileList: UploadFile[]) => void
}

const BusinessUpload: React.FC<BusinessUploadProps> = ({
  children,
  onChange,
  fileList,
  ...restProps
}) => {
  const [visible, setVisible] = useState<boolean>(false)
  const [previewImage, setPreviewImage] = useState<{
    url: string
    title: string
  }>({
    url: '',
    title: ''
  })
  const maxCount: number = 1

  const handleChange = (info: UploadChangeParam<UploadFile>) => {
    let fileList = [...info.fileList]
    // Limit the number of uploaded files
    fileList = fileList.slice(-maxCount)
    // Call both the form onChange and our custom onChange if provided
    onChange?.(fileList)
  }

  const getBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = (error) => reject(error)
    })
  }

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      if (file.originFileObj) {
        file.preview = await getBase64(file.originFileObj)
      }
    }

    setPreviewImage({
      url: file.url || file.preview || '',
      title: file.name || file.url?.substring(file.url.lastIndexOf('/') + 1) || ''
    })
    setVisible(true)
  }

  const handleCancel = () => {
    setPreviewImage({
      url: '',
      title: ''
    })
    setVisible(false)
  }

  return (
    <>
      <Upload
        maxCount={maxCount}
        listType="picture"
        fileList={fileList}
        beforeUpload={() => false}
        onChange={handleChange}
        onPreview={handlePreview}
        {...restProps}>
        {(fileList || [])?.length < maxCount && (
          <Button icon={<UploadOutlined />} disabled={fileList && fileList.length >= maxCount}>
            {children}
          </Button>
        )}
      </Upload>
      <Modal
        centered
        open={visible}
        title={previewImage.title}
        footer={null}
        onCancel={handleCancel}>
        <picture>
          <img style={{ width: '100%' }} src={previewImage.url} alt={previewImage.title} />
        </picture>
      </Modal>
    </>
  )
}

export default BusinessUpload
