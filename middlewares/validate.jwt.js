import jwt from 'jsonwebtoken'

export const validateJwt = async(req, res, next) => {
    try {
        let secretKey = process.env.SECRET_KEY
        let { authorization } = req.headers

        if (!authorization) return res.status(401).send({message: 'Unauthorizated'})
        let user = jwt.verify(authorization, secretKey)
        req.user = user
        next()
    } catch (err) {
        console.error(err)
        return res.status(401).send({message: 'Invalidate token'})
    }
}

export const isAdmin = async (req, res, next)=>{
    try{
        const { user } = req
        if(!user || user.role !== 'ADMIN') return res.status(403).send(
            {
                succes: false,
                message: `You do not have access`
            }
        )
        next()
    } catch (err){
        console.error(err)
        return res.status(403).send(
            {
                succes: false,
                message: 'Unauthorized role'
            }
        )
    }
}