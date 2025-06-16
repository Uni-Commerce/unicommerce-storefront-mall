import type { ThemeConfig } from 'antd'

export const antd: ThemeConfig = {
  token: {
    colorPrimary: '#4766F0',
    colorText: '#6B6B6B'
  },
  components: {
    Button: {
      paddingInline: 25,
      colorPrimary: '#4766F0',
      colorPrimaryHover: '#4766F0',
      colorTextDisabled: '#666666',
      borderRadius: 3
    },
    Input: {
      controlHeight: 34,
      paddingSM: 13,
      colorText: '#221F1F',
      colorTextPlaceholder: '#BDBDBD',
      colorPrimaryHover: '#4766F0',
      colorBgContainerDisabled: '#F8F8F8',
      borderRadius: 3
    },
    Select: {
      controlHeight: 34,
      borderRadius: 0,
      paddingSM: 13,
      controlItemBgHover: '#f6f8fc',
      controlItemBgActive: '#f6f8fc'
    },
    Radio: {
      colorBorder: '#E7E7E7'
    },
    Menu: {
      itemMarginInline: 10,
      itemBorderRadius: 3
    },
    Card: {
      borderRadiusLG: 3
    },
    Modal: {
      borderRadiusLG: 0
    }
  }
}
