export default interface IPageProps {
    name: string;
    user: {
        uid: string;
    };
}

export default interface FridgeProps {
    
}

export default interface IngredientsProps {
    searchData: [{
        name: string;
        image: string;
        key: string;
    }];
}