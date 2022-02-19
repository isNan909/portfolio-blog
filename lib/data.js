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
        content
        bannerImage {
          url
        }
      }
      case_studies(first: 4, orderBy: updatedAt_DESC) {
        title
        tags
        subheading
        slug
        bannerImage {
          url
        }
      }
    }
  `;
  const response = await graphQLClient.request(query);
  return response;
};

export const getBlogs = async () => {
  const graphQLClient = new GraphQLClient(api_endpoint);
  const query = gql`
    {
      blogs {
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
        content
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
      }
    }
  `;

  const slugName = {
    slug
  };

  const response = await graphQLClient.request(query, slugName);
  return response;
};
