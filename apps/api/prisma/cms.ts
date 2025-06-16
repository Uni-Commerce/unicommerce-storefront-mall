import { PrismaClient, CmsPage, UrlKeyType } from '@prisma/client'

const prisma = new PrismaClient()

const main = async () => {
  const cmsList: Array<
    Pick<
      CmsPage,
      | 'url'
      | 'title'
      | 'metaTitle'
      | 'metaKeywords'
      | 'metaDescription'
      | 'description'
      | 'disabled'
    >
  > = [
    {
      url: '/privacy-policy',
      title: '隐私政策',
      metaTitle: '隐私政策',
      metaKeywords: '隐私政策',
      metaDescription: '隐私政策',
      description: '隐私政策',
      disabled: false
    },
    {
      url: '/term-of-service',
      title: '服务条款',
      metaTitle: '服务条款',
      metaKeywords: '服务条款',
      metaDescription: '服务条款',
      description: '服务条款',
      disabled: false
    }
  ]

  for (const cms of cmsList) {
    const cmsPage = await prisma.cmsPage.upsert({
      where: { url: cms.url },
      update: {
        url: cms.url,
        title: cms.title,
        metaTitle: cms.metaTitle,
        metaKeywords: cms.metaKeywords,
        metaDescription: cms.metaDescription,
        description: cms.description,
        disabled: cms.disabled
      },
      create: {
        url: cms.url,
        title: cms.title,
        metaTitle: cms.metaTitle,
        metaKeywords: cms.metaKeywords,
        metaDescription: cms.metaDescription,
        description: cms.description,
        disabled: cms.disabled
      }
    })
    await prisma.urlKey.upsert({
      where: {
        type_typeId: {
          type: UrlKeyType.CMS,
          typeId: cmsPage.id
        }
      },
      update: {
        url: cmsPage.url,
        type: UrlKeyType.CMS,
        disabled: cmsPage.disabled,
        typeId: cmsPage.id
      },
      create: {
        url: cmsPage.url,
        type: UrlKeyType.CMS,
        disabled: cmsPage.disabled,
        typeId: cmsPage.id
      }
    })
  }
}

main()
  .catch((e) => {
    console.error(e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
