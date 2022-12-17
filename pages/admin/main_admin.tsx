
import {ReactElement, useState} from "react";
import ArticleAdmin from "./article_admin";
import LayoutAdmin from "../../src/components/layout_admin";
import { NextPageWithLayout } from "../_app";


const MainAdmin: NextPageWithLayout = () => {
  
    return(
            <ArticleAdmin />
      

    )
}
MainAdmin.getLayout = function getLayout(page: ReactElement) {
    return (
        <LayoutAdmin>
            {page}
        </LayoutAdmin>
    )
}

export default  MainAdmin;