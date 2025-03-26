const dashboard = async (req, res, next)=>{
    
    try{

        if (req.user){
            res.status(200).json({            
                message : `welcome ${req.user.firstName}`
            }); 
        }else{
            res.status(402).json({            
                message : `bad reqest`
            }); 
        }
    
    }catch(error){
        res.status(400).json({            
            message : `Bad request`
        }); 
    };
} 

module.exports = {
    dashboard
}