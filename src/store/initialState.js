import globalHook, { Store } from 'use-global-hook';

export const initialState = {
    
    plays: [{
        cover: "add cover",
        title: "add title",
        key: "add key",
        pix: [{
            key: "add key",
            src: "add src"
        }]
    }],    
    playIdx: 0,
    levelIdx: 0,    
    profileToken: {}
};