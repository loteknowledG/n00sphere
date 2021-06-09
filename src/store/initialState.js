import globalHook, { Store } from 'use-global-hook';

export const initialState = {
    
    plays: [
        {
        cover: "add cover",
        title: "add title",
        key: "add key",
        pix: [{
            key: "add key",
            src: "add src"
        }
    ]

    }],    
    playIdx: 0,
    // now: {    
    //     play: {
    //         agent: 'Add agent',      
    //         cover: '',      
    //         key: '',      
    //         pix: [{
    //             key: '',
    //             src: ''
    //         }],
    //         title: 'Add title',
    //         },
    //         player: {
    //         PPP: 0
    //         },
    //         tune: { 
    //         key: '',
    //         src: ''
    //     }
    // },
   
    levelIdx: 0,    
    profileToken: {}
    
      
};