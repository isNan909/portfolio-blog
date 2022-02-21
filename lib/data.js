import { api_endpoint } from '@/constants/index';
import { GraphQLClient, gql } from 'graphql-request';

export const getBlogsAndCases = async () => {
  const graphQLClient = new GraphQLClient(api_endpoint);
  const query = gql`
    {
      blogs(first: 4, orderBy: updatedAt_DESC) {
        title
        date
        tags
        slug
        bannerImage {
          url
          width
          height
        }
      }
      case_studies(first: 4, orderBy: updatedAt_DESC) {
        title
        tags
        subheading
        slug
        bannerImage {
          url
          width
          height
        }
      }
    }
  `;
  const response = await graphQLClient.request(query);
  return response;
};

export const getPaginatedBlogs = async () => {
  const graphQLClient = new GraphQLClient(api_endpoint);
  const query = gql`
    query getPaginatedBlog {
      blogsConnection(orderBy: updatedAt_DESC, first: 5, skip: 0) {
        edges {
          node {
            title
            date
            tags
            slug
            content
            bannerImage {
              url
            }
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          pageSize
        }
      }
    }
  `;
  const response = await graphQLClient.request(query);
  return response;
};

export const getCases = async () => {
  const graphQLClient = new GraphQLClient(api_endpoint);
  const query = gql`
    {
      case_studies {
        title
        tags
        subheading
        slug
        bannerImage {
          url
          width
          height
        }
      }
    }
  `;
  const response = await graphQLClient.request(query);
  return response;
};

export const getSingleBlog = async slug => {
  const graphQLClient = new GraphQLClient(api_endpoint);
  const query = gql`
    query getSingleBlog($slug: String!) {
      blogs(where: { slug: $slug }) {
        title
        date
        tags
        slug
        content
        bannerImage {
          url
          width
          height
        }
      }
    }
  `;

  const slugName = {
    slug
  };

  const response = await graphQLClient.request(query, slugName);
  return response;
};

export const getSingleCase = async slug => {
  const graphQLClient = new GraphQLClient(api_endpoint);
  const query = gql`
    query getSingleCase($slug: String!) {
      case_studies(where: { slug: $slug }) {
        title
        tags
        subheading
        content
        slug
        bannerImage {
          url
          width
          height
        }
      }
    }
  `;

  const slugName = {
    slug
  };

  const response = await graphQLClient.request(query, slugName);
  return response;
};

export const getCaseSlugs = async () => {
  const graphQLClient = new GraphQLClient(api_endpoint);
  const query = gql`
    {
      case_studies {
        slug
      }
    }
  `;
  const response = await graphQLClient.request(query);
  return response;
};

export const getBlogSlugs = async () => {
  const graphQLClient = new GraphQLClient(api_endpoint);
  const query = gql`
    {
      blogs {
        slug
      }
    }
  `;
  const response = await graphQLClient.request(query);
  return response;
};
