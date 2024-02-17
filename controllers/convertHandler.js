const Stock = require('../models/stock.model')

exports.saveStock = async(symbol, ip, like) => {
    let savedStock = await Stock.findOne({ symbol: symbol });

    if(!savedStock){
        let newStock = new Stock({ symbol: symbol, ips: [ip], likes: like ? 1 : 0 });
        newStock.save();
        return newStock;
    }
    else{
        if(like){
            if(savedStock.ips.filter(i => i === ip).length === 0 ){
                savedStock.ips.push(ip);
                savedStock.likes = savedStock.likes+1;
            }
            else{
                if(savedStock.likes === 0) savedStock.likes = savedStock.likes+1;                
            } 
            savedStock.save();
        }
        return savedStock;
    }
}