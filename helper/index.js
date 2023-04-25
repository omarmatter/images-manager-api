// function to return response
const response = (res, message, data, status=200) => {
    res.status(status).json({
        'status': status,
        'message' : message,
        'data': data
      
    });
    };

    // function to return error response
    const errorResponse = (res, message,err, status=400) => {
        if (err && err.name === 'SequelizeValidationError') {
      // first error 
        const error = err.errors[0].message
        res.status(status).json({
            'status': status,
             'message':error,
             'data':null
             
          
        });
          } else {
            res.status(status).json({
                'status': status,
                 'message':message,
                 'data':null
            })
                 
            // res.status(500).json(err);
          }
    };



    module.exports = {response, errorResponse}