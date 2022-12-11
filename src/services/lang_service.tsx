import { useEffect } from "react";
import {Lang} from "../types/lang";
import {useRouter} from "next/router";

class LangService {
    lang_key = 'LANG';

    constructor() {
    }

    loadFromStorage(): Lang {
        var stored = localStorage.getItem(this.lang_key);
        return stored ? JSON.parse(stored) : [];
    }

    commit(lang: Lang) {
        localStorage.setItem(this.lang_key, JSON.stringify(lang));
    }

    getLang() {
        if (typeof window !== 'undefined') {
            return this.loadFromStorage();
        }
    }

    addLang(lang: Lang) {

        this.commit(lang);
    }

    removeLang(key: string) {
        localStorage.removeItem(key);
    }
}

function usePersistLocaleCookie() {
    const { locale, defaultLocale } = useRouter()

    useEffect(persistLocaleCookie, [locale, defaultLocale])
    function persistLocaleCookie() {
        if(locale !== defaultLocale) {
            const date = new Date()
            const expireMs = 100 * 24 * 60 * 60 * 1000 // 100 days
            date.setTime(date.getTime() + expireMs)
            document.cookie = `NEXT_LOCALE=${locale};expires=${date.toUTCString()};path=/`
        }
    }
}

export default LangService;
