import originJSONP from 'jsonp'

export default function jsonp(url, data, option) {
    return new Promise((resolve, reject) => {
        originJSONP(url, option, (err, data) => {
            if(!err){
                resolve(data)
            }else{
                reject(err)
            }
        })
    })
}

function param(data) {
    let url = ''
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        
    }
}