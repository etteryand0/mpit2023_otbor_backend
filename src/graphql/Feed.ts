import { list, nonNull, objectType, queryField,  } from "nexus";

export const TrendingProjectsQuery = queryField('trendingProjects', {
  type: nonNull(list(nonNull('Project'))),
  resolve(_parent, _args, { prisma, select }) {
    return prisma.project.findMany({
      orderBy: { likes: {_count: 'desc'} },
      ...select,
    })
  }
})

export const RecentProjectsQuery = queryField('recentProjects', {
  type: nonNull(list(nonNull('Project'))),
  resolve(_parent, _args, { prisma, select }) {
    return prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
      ...select,
    })
  }
})

export const ProjectsFeedQuery = queryField('projectsFeed', {
  type: nonNull(list(nonNull('Project'))),
  async resolve(_parent, _args, { prisma, select }) {
    select.select = { ...select.select, id: true }

    const trending = await prisma.project.findMany({
      orderBy: { likes: {_count: 'desc'} },
      take: 3,
      ...select,
    })

    return trending
  }
})