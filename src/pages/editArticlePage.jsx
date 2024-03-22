import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { message } from 'antd';

import { useAuth } from '../hooks/useAuth.js';
import { useUpdateArticleMutation, useGetArticleQuery } from '../redux/blogApi.js';
import ArticleForm from '../components/articleForm/articleForm';
import LoadingIndicator from '../components/loadingIndicator/loadingIndicator';
import ErrorIndicator from '../components/errorIndicator/errorIndicator';

export default function EditArticlePage() {
  const { slug } = useParams();
  const { data, isLoading, isError, error } = useGetArticleQuery(slug);
  const navigate = useNavigate();
  const [updateArticle, { isLoading: isUpdateArticle }] = useUpdateArticleMutation();
  const { username, isAuth } = useAuth();

  if (isLoading) {
    return <LoadingIndicator tip="Loading article info" />;
  }

  if (isError) {
    return <ErrorIndicator error={error} />;
  }

  if (!isAuth) {
    navigate('/sign-in');
    return null;
  }

  if (!data || !data.article || data.article.author.username !== username) {
    navigate(`/articles/${slug}`);
    return null;
  }

  const updateArticleHandler = async (updArticle) => {
    try {
      await updateArticle({
        article: { ...updArticle },
        slug,
      }).unwrap();
      message.success('Article updated');
      navigate(`/articles/${slug}`);
    } catch (err) {
      message.error(`Error ${err.status}`);
    }
  };

  if (isUpdateArticle) {
    return <LoadingIndicator tip="Updating article" />;
  }

  return <ArticleForm title="Edit article" article={data.article} onSubmit={updateArticleHandler} />;
}
