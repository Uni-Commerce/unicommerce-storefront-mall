import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Card } from 'antd'
import { useIntl } from 'react-intl'
import { AiFillWechat, AiOutlineUser, AiTwotoneTag } from 'react-icons/ai'
import {
  MdDashboardCustomize,
  MdOutlineDiscount,
  MdOutlineAttachEmail,
  MdFiberNew
} from 'react-icons/md'
import { FiUsers } from 'react-icons/fi'
import { TbCategoryPlus, TbBrandAuth0 } from 'react-icons/tb'
import { GrSystem } from 'react-icons/gr'
import { VscGitStashApply } from 'react-icons/vsc'
import { GiKnightBanner } from 'react-icons/gi'
import { SiPayloadcms, SiAuthentik, SiGooglenews } from 'react-icons/si'
import { FaIndustry, FaPeopleCarry, FaRecordVinyl, FaCity } from 'react-icons/fa'
import { PiTrainRegional } from 'react-icons/pi'
import { BsFileEarmarkPost, BsPostcard, BsFillPostageHeartFill } from 'react-icons/bs'
import { FaBuilding } from 'react-icons/fa'
import { FaBuildingWheat, FaTreeCity } from 'react-icons/fa6'
import { RiNewspaperLine } from 'react-icons/ri'
import { TiTags, TiNews } from 'react-icons/ti'
import { useNavigate } from 'react-router-dom'
import type { ReactNode } from 'react'

import { permissions } from '@/config/permisson'

interface Menu {
  key: string
  icon: ReactNode
  title: string
  permissions?: string[]
}

const HomePage = () => {
  const navigate = useNavigate()
  const { formatMessage } = useIntl()
  const userRole = useSelector((state: Store) => state.user.userRole)

  const modules: string[] = useMemo(() => {
    const result = permissions.find((item) => item.name === userRole)
    return result?.modules ?? []
  }, [userRole])

  const originList: Array<Menu> = useMemo(() => {
    return [
      {
        key: '/region/province-list',
        icon: <FaBuilding />,
        title: '省份管理',
        moduleName: 'region'
      },
      {
        key: '/region/city-list',
        icon: <FaCity />,
        title: '市级管理',
        moduleName: 'region'
      },
      {
        key: '/region/district-list',
        icon: <FaTreeCity />,
        title: '区县管理',
        moduleName: 'region'
      },
      {
        key: '/region/ui',
        icon: <FaBuildingWheat />,
        title: '区域UI选择器',
        moduleName: 'region'
      },
      {
        key: '/wechat',
        icon: <AiFillWechat />,
        title: '公众号关注列表',
        moduleName: 'wechat'
      },
      {
        key: '/banner',
        icon: <GiKnightBanner />,
        title: formatMessage({ id: 'menu.banner' }),
        moduleName: 'banner'
      },
      {
        key: '/url-key',
        icon: <MdDashboardCustomize />,
        title: formatMessage({ id: 'menu.urlKey' }),
        moduleName: 'urlKey'
      },
      {
        key: '/cms',
        icon: <SiPayloadcms />,
        title: formatMessage({ id: 'menu.cms' }),
        moduleName: 'cms'
      },
      {
        key: '/category',
        icon: <TbCategoryPlus />,
        title: formatMessage({ id: 'menu.category' }),
        moduleName: 'category'
      },
      {
        key: '/industry',
        icon: <FaIndustry />,
        title: formatMessage({ id: 'menu.industry' }),
        moduleName: 'industry'
      },
      {
        key: '/tag/tag-sector',
        icon: <TiTags />,
        title: '领域标签',
        moduleName: 'tag'
      },
      {
        key: '/tag/tag-corp',
        icon: <AiTwotoneTag />,
        title: '公司标签',
        moduleName: 'tag'
      },
      {
        key: '/post/post-list',
        icon: <BsFileEarmarkPost />,
        title: '文章列表',
        moduleName: 'post'
      },
      {
        key: '/post/post-supply',
        icon: <BsPostcard />,
        title: '供应管理',
        moduleName: 'post'
      },
      {
        key: '/post/post-demand',
        icon: <BsFillPostageHeartFill />,
        title: '需求管理',
        moduleName: 'post'
      },
      {
        key: '/auth/company',
        icon: <SiAuthentik />,
        title: '公司认证',
        moduleName: 'auth'
      },
      {
        key: '/auth/person',
        icon: <TbBrandAuth0 />,
        title: '个人认证',
        moduleName: 'auth'
      },
      {
        key: '/store/store-auth',
        icon: <VscGitStashApply />,
        title: '资质审核',
        moduleName: 'store'
      },
      {
        key: '/store/store-list',
        icon: <MdOutlineDiscount />,
        title: '商家列表',
        moduleName: 'store'
      },
      {
        key: '/category-service',
        icon: <PiTrainRegional />,
        title: formatMessage({ id: 'menu.categoryService' }),
        moduleName: 'categoryService'
      },
      {
        key: '/subsribe/subsribe-category',
        icon: <SiGooglenews />,
        title: '关注栏目',
        moduleName: 'subsribe'
      },
      {
        key: '/subsribe/subsribe-company',
        icon: <RiNewspaperLine />,
        title: '关注企业',
        moduleName: 'subsribe'
      },
      {
        key: '/newsletter/newsletter-list',
        icon: <MdFiberNew />,
        title: '微信栏目订阅',
        moduleName: 'newsletter'
      },
      {
        key: '/newsletter/newsletter-record',
        icon: <TiNews />,
        title: '公众号推送记录',
        moduleName: 'newsletter'
      },
      {
        key: '/account-information',
        icon: <AiOutlineUser />,
        title: formatMessage({ id: 'menu.account' }),
        moduleName: 'account'
      },
      {
        key: '/email-templates',
        icon: <MdOutlineAttachEmail />,
        title: formatMessage({ id: 'menu.email' }),
        moduleName: 'email'
      },
      {
        key: '/users',
        icon: <FiUsers />,
        title: formatMessage({ id: 'menu.users' }),
        moduleName: 'users'
      },
      {
        key: '/admin',
        icon: <FaPeopleCarry />,
        title: formatMessage({ id: 'menu.admin' }),
        moduleName: 'admin'
      },
      {
        key: '/system-logger',
        icon: <GrSystem />,
        title: formatMessage({ id: 'menu.system' }),
        moduleName: 'system'
      },
      {
        key: '/email-logger',
        icon: <FaRecordVinyl />,
        title: formatMessage({ id: 'menu.emailLog' }),
        moduleName: 'emailLog'
      }
    ]
  }, [])

  const menuList: any[] = useMemo(() => {
    return originList.filter((item: any) => {
      if (item.moduleName) {
        return modules.includes(item.moduleName)
      }
      return true
    })
  }, [originList, modules])

  const handleRedirect = (url: string) => {
    navigate(url)
  }

  return (
    <div>
      <div>
        {menuList.map((menu: Menu) => {
          const { key, icon, title } = menu
          const Component = (
            <div>
              {icon}
              <span>{title}</span>
            </div>
          )
          return (
            <Card
              key={key}
              hoverable
              title={Component}
              onClick={() => {
                handleRedirect(key)
              }}>
              <div />
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default HomePage
