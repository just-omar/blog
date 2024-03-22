import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth.js';
import { useLazyGetProfileQuery } from '../../redux/blogApi.js';
import { WithAuth } from '../../hoc/withAuth.js';
import ArticlePage from '../../pages/articlePage.jsx';
import '../../global.scss';
import ArticleList from '../articleList/articleList.jsx';
import Header from '../header/header.jsx';
import SignUpPage from '../../pages/signUpPage.jsx';
import SignInPage from '../../pages/signInPage.jsx';
import UserProfilePage from '../../pages/userProfilePage.jsx';
import EditArticlePage from '../../pages/editArticlePage.jsx';
import NewPostPage from '../../pages/newPostPage.jsx';
import NotFoundPage from '../../pages/notFoundPage.jsx';

const PATHS = {
  ROOT: '/',
  ARTICLES: '/articles',
  SIGN_UP: '/sign-up',
  SIGN_IN: '/sign-in',
  NEW_ARTICLE: '/new-article',
  PROFILE: '/profile',
  ARTICLE_EDIT: '/articles/:slug/edit',
};

function App() {
  const [trigger] = useLazyGetProfileQuery();
  const { isAuth } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      if (localStorage.getItem('token') && !isAuth) {
        await trigger();
      }
      setIsLoading(false);
    }

    checkAuth();
  }, [isAuth, trigger]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path={PATHS.ROOT} element={<Header />}>
        <Route index element={<ArticleList />} />
        <Route path={PATHS.ARTICLES} element={<ArticleList />} />
        <Route path={PATHS.ARTICLES + '/:slug'} element={<ArticlePage />} />
        <Route path={PATHS.SIGN_UP} element={<SignUpPage />} />
        <Route path={PATHS.SIGN_IN} element={<SignInPage />} />

        <Route element={<WithAuth />}>
          <Route path={PATHS.NEW_ARTICLE} element={<NewPostPage />} />
          <Route path={PATHS.PROFILE} element={<UserProfilePage />} />
          <Route path={PATHS.ARTICLE_EDIT} element={<EditArticlePage />} />
        </Route>

        {/* <Route path={PATHS.NEW_ARTICLE} element={isAuth ? <NewPostPage /> : <Navigate to={PATHS.SIGN_IN} />} />
        <Route path={PATHS.PROFILE} element={isAuth ? <UserProfilePage /> : <Navigate to={PATHS.SIGN_IN} />} />
        <Route path={PATHS.ARTICLE_EDIT} element={isAuth ? <EditArticlePage /> : <Navigate to={PATHS.SIGN_IN} />} /> */}

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
