const filterItems = (items) => {
    
    //filter items based on the type
    let breakfast = [], snacks = [], lunch = [], dinner = [];
    items.map(item => {
        switch(item.type){
            case 'BREAKFAST':
                breakfast.push(item);
                break;
            case 'SNACKS':
                snacks.push(item);
                break;
            case 'LUNCH': 
                lunch.push(item);
                break;
            case 'DINNER':
                dinner.push(item);
                break;
            default:
                return;                
        }
    })

    return {
        breakfast,
        snacks,
        lunch,
        dinner
    }
}

module.exports = filterItems;