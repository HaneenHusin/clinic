
import {useRecoilState} from "recoil";
import {myAdminAppBarState, myLayoutState} from "../../Atoms/layout";
import {useState} from "react";
import {Box} from "@chakra-ui/react";
import ArticleAdmin from "./article_admin";


export function MainAdmin(){
    const [headerFooterState, setHeaderFooterState] = useRecoilState(myLayoutState);
    const [adminAppBarState, setAdminAppBarState] = useRecoilState(myAdminAppBarState);
    useState(() => {
        setHeaderFooterState({...headerFooterState, footer: "none", appBar: "block"})
        setAdminAppBarState(true)
    });
    return(
        <Box>
            <ArticleAdmin />
        </Box>

    )
}