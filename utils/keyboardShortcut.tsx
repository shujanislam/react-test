import { useEffect } from 'react';

export function KeyboardShortcut(){
    useEffect(()=> {
        function handler(e: KeyboardEvent){
            if((e.ctrlKey || e.metaKey) && e.key.toLowerCase() == "k"){
                e.preventDefault();

                const el = document.querySelector('nav input[type="text"]');
                if(el instanceof HTMLInputElement) el.focus();
            }
        }

        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, []);

    return null;
}
