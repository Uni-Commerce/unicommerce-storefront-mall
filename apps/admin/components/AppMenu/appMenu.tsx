import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'antd'
import { FormattedMessage } from 'react-intl'
import { AiFillWechat, AiOutlineUser, AiTwotoneTag } from 'react-icons/ai'
import {
  MdDashboardCustomize,
  MdOutlineDiscount,
  MdOutlineAttachEmail,
  MdOutlinePostAdd,
  MdFiberNew
} from 'react-icons/md'
import { FiUsers } from 'react-icons/fi'
import { TbWashMachine, TbCategoryPlus, TbBrandAuth0 } from 'react-icons/tb'
import { GrSystem } from 'react-icons/gr'
import { VscGitStashApply } from 'react-icons/vsc'
import { GiKnightBanner } from 'react-icons/gi'
import { SiPayloadcms, SiAuthelia, SiAuthentik, SiGooglenews } from 'react-icons/si'
import { FaIndustry, FaPeopleCarry, FaRecordVinyl, FaCity } from 'react-icons/fa'
import { PiTrainRegional, PiNewspaperClippingFill } from 'react-icons/pi'
import { BsFileEarmarkPost, BsPostcard, BsFillPostageHeartFill } from 'react-icons/bs'
import { BiSolidStore } from 'react-icons/bi'
import { FaBuilding, FaRegNewspaper, FaTags } from 'react-icons/fa'
import { FaBuildingWheat, FaTreeCity } from 'react-icons/fa6'
import { RiNewspaperLine } from 'react-icons/ri'
import { TiTags, TiNews } from 'react-icons/ti'
import type { ReactNode } from 'react'

import { useAppMenu } from '@/hooks/AppMenu'

interface MenuList {
  key: string
  icon: ReactNode
  label: ReactNode
  moduleName?: string
  children?: Array<MenuList>
}

const AppMenu = () => {
  const { modules, openKeys, selectedKeys, handleOnClick, handleOnOpen, handleRedirect } =
    useAppMenu()

  const originList: Array<MenuList> = useMemo(() => {
    return [
      {
        key: '/',
        icon: <MdDashboardCustomize />,
        label: (
          <Link to="/" onClick={handleRedirect}>
            <FormattedMessage id="menu.dashboard" />
          </Link>
        )
      },
      {
        key: '/region',
        icon: <TbWashMachine />,
        label: (
          <span>
            <FormattedMessage id="menu.region" />
          </span>
        ),
        moduleName: 'region',
        children: [
          {
            key: '/region/province-list',
            icon: <FaBuilding />,
            label: (
              <Link to="/region/province-list" onClick={handleRedirect}>
                省份管理
              </Link>
            )
          },
          {
            key: '/region/city-list',
            icon: <FaCity />,
            label: (
              <Link to="/region/city-list" onClick={handleRedirect}>
                市级管理
              </Link>
            )
          },
          {
            key: '/region/district-list',
            icon: <FaTreeCity />,
            label: (
              <Link to="/region/district-list" onClick={handleRedirect}>
                区县管理
              </Link>
            )
          },
          {
            key: '/region/ui',
            icon: <FaBuildingWheat />,
            label: (
              <Link to="/region/ui" onClick={handleRedirect}>
                区域UI选择器
              </Link>
            )
          }
        ]
      },
      {
        key: '/wechat',
        icon: <AiFillWechat />,
        label: (
          <Link to="/wechat" onClick={handleRedirect}>
            <FormattedMessage id="menu.wechat" />
          </Link>
        ),
        moduleName: 'wechat'
      },
      {
        key: '/banner',
        icon: <GiKnightBanner />,
        label: (
          <Link to="/banner" onClick={handleRedirect}>
            <FormattedMessage id="menu.banner" />
          </Link>
        ),
        moduleName: 'banner'
      },
      {
        key: '/url-key',
        icon: <MdDashboardCustomize />,
        label: (
          <Link to="/url-key" onClick={handleRedirect}>
            <FormattedMessage id="menu.urlKey" />
          </Link>
        ),
        moduleName: 'urlKey'
      },
      {
        key: '/cms',
        icon: <SiPayloadcms />,
        label: (
          <Link to="/cms" onClick={handleRedirect}>
            <FormattedMessage id="menu.cms" />
          </Link>
        ),
        moduleName: 'cms'
      },
      {
        key: '/category',
        icon: <TbCategoryPlus />,
        label: (
          <Link to="/category" onClick={handleRedirect}>
            <FormattedMessage id="menu.category" />
          </Link>
        ),
        moduleName: 'category'
      },
      {
        key: '/industry',
        icon: <FaIndustry />,
        label: (
          <Link to="/industry" onClick={handleRedirect}>
            <FormattedMessage id="menu.industry" />
          </Link>
        ),
        moduleName: 'industry'
      },
      {
        key: '/tag',
        icon: <FaTags />,
        label: <span>标签管理</span>,
        moduleName: 'tag',
        children: [
          {
            key: '/tag/tag-sector',
            icon: <TiTags />,
            label: (
              <Link to="/tag/tag-sector" onClick={handleRedirect}>
                领域标签
              </Link>
            )
          },
          {
            key: '/tag/tag-corp',
            icon: <AiTwotoneTag />,
            label: (
              <Link to="/tag/tag-corp" onClick={handleRedirect}>
                公司标签
              </Link>
            )
          }
        ]
      },
      {
        key: '/post',
        icon: <MdOutlinePostAdd />,
        label: <span>文章管理</span>,
        moduleName: 'post',
        children: [
          {
            key: '/post/post-list',
            icon: <BsFileEarmarkPost />,
            label: (
              <Link to="/post/post-list" onClick={handleRedirect}>
                文章列表
              </Link>
            )
          },
          {
            key: '/post/post-supply',
            icon: <BsPostcard />,
            label: (
              <Link to="/post/post-supply" onClick={handleRedirect}>
                供应管理
              </Link>
            )
          },
          {
            key: '/post/post-demand',
            icon: <BsFillPostageHeartFill />,
            label: (
              <Link to="/post/post-demand" onClick={handleRedirect}>
                需求管理
              </Link>
            )
          }
        ]
      },
      {
        key: '/auth',
        icon: <SiAuthelia />,
        label: <span>认证管理</span>,
        moduleName: 'auth',
        children: [
          {
            key: '/auth/company',
            icon: <SiAuthentik />,
            label: (
              <Link to="/auth/company" onClick={handleRedirect}>
                公司认证
              </Link>
            )
          },
          {
            key: '/auth/person',
            icon: <TbBrandAuth0 />,
            label: (
              <Link to="/auth/person" onClick={handleRedirect}>
                个人认证
              </Link>
            )
          }
        ]
      },
      {
        key: '/store',
        icon: <BiSolidStore />,
        label: <span>入驻商家管理</span>,
        moduleName: 'store',
        children: [
          {
            key: '/store/store-auth',
            icon: <VscGitStashApply />,
            label: (
              <Link to="/store/store-auth" onClick={handleRedirect}>
                资质审核
              </Link>
            )
          },
          {
            key: '/store/store-list',
            icon: <MdOutlineDiscount />,
            label: (
              <Link to="/store/store-list" onClick={handleRedirect}>
                商家列表
              </Link>
            )
          }
        ]
      },
      {
        key: '/category-service',
        icon: <PiTrainRegional />,
        label: (
          <Link to="/category-service" onClick={handleRedirect}>
            <FormattedMessage id="menu.categoryService" />
          </Link>
        ),
        moduleName: 'categoryService'
      },
      {
        key: '/subsribe',
        icon: <PiNewspaperClippingFill />,
        label: <span>关注列表管理</span>,
        moduleName: 'subsribe',
        children: [
          {
            key: '/subsribe/subsribe-category',
            icon: <SiGooglenews />,
            label: (
              <Link to="/subsribe/subsribe-category" onClick={handleRedirect}>
                关注栏目
              </Link>
            )
          },
          {
            key: '/subsribe/subsribe-company',
            icon: <RiNewspaperLine />,
            label: (
              <Link to="/subsribe/subsribe-company" onClick={handleRedirect}>
                关注企业
              </Link>
            )
          }
        ]
      },
      {
        key: '/newsletter',
        icon: <FaRegNewspaper />,
        label: <span>微信订阅管理</span>,
        moduleName: 'newsletter',
        children: [
          {
            key: '/newsletter/newsletter-list',
            icon: <MdFiberNew />,
            label: (
              <Link to="/newsletter/newsletter-list" onClick={handleRedirect}>
                微信栏目订阅
              </Link>
            )
          },
          {
            key: '/newsletter/newsletter-record',
            icon: <TiNews />,
            label: (
              <Link to="/newsletter/newsletter-record" onClick={handleRedirect}>
                公众号推送记录
              </Link>
            )
          }
        ]
      },
      {
        key: '/account-information',
        icon: <AiOutlineUser />,
        label: (
          <Link to="/account-information" onClick={handleRedirect}>
            <FormattedMessage id="menu.account" />
          </Link>
        ),
        moduleName: 'account'
      },
      {
        key: '/email-templates',
        icon: <MdOutlineAttachEmail />,
        label: (
          <Link to="/email-templates" onClick={handleRedirect}>
            <FormattedMessage id="menu.email" />
          </Link>
        ),
        moduleName: 'email'
      },
      {
        key: '/users',
        icon: <FiUsers />,
        label: (
          <Link to="/users" onClick={handleRedirect}>
            <FormattedMessage id="menu.users" />
          </Link>
        ),
        moduleName: 'users'
      },
      {
        key: '/admin',
        icon: <FaPeopleCarry />,
        label: (
          <Link to="/admin" onClick={handleRedirect}>
            <FormattedMessage id="menu.admin" />
          </Link>
        ),
        moduleName: 'admin'
      },
      {
        key: '/system-logger',
        icon: <GrSystem />,
        label: (
          <Link to="/system-logger" onClick={handleRedirect}>
            <FormattedMessage id="menu.system" />
          </Link>
        ),
        moduleName: 'system'
      },
      {
        key: '/email-logger',
        icon: <FaRecordVinyl />,
        label: (
          <Link to="/email-logger" onClick={handleRedirect}>
            <FormattedMessage id="menu.emailLog" />
          </Link>
        ),
        moduleName: 'emailLog'
      }
    ]
  }, [handleRedirect])

  const menuList: any[] = useMemo(() => {
    const array: any[] = originList.filter((item: MenuList) => {
      if (item.moduleName) {
        return modules.includes(item.moduleName)
      }
      return true
    })
    return array.map((item: MenuList) => {
      delete item.moduleName
      return item
    })
  }, [originList, modules])

  return (
    <Menu
      theme="dark"
      mode="inline"
      openKeys={openKeys}
      selectedKeys={selectedKeys}
      items={menuList}
      onClick={handleOnClick}
      onOpenChange={handleOnOpen}
    />
  )
}

export default AppMenu
