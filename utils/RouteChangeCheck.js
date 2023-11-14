import React, { useEffect, useState } from 'react'
import { LoadingAnimation } from '../components/loading_animation';
import Router from "next/router";
import styled from 'styled-components';

export const RouteChangeCheck = ({ children }) => {
      const [loading, setLoading] = useState(false);
      useEffect(() => {
    const startLoading = () => {
      setLoading(true);
    };

    const stopLoading = () => {
      setLoading(false);
    };

    Router.events.on("routeChangeStart", startLoading);
    Router.events.on("routeChangeComplete", stopLoading);
    Router.events.on("routeChangeError", stopLoading);

    return () => {
      Router.events.off("routeChangeStart", startLoading);
      Router.events.off("routeChangeComplete", stopLoading);
      Router.events.off("routeChangeError", stopLoading);
    };
      }, []);
    if (loading) {
        return <Wrapper>
          <LoadingAnimation />
      </Wrapper>;
    }
    return (<>
    {children}
    </>
    
  )
}
const Wrapper = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items:center;
`
