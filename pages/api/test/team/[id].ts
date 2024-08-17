import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
}
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === 'GET') {
    try {
      const { id } = req.query

      // To-do: Update Error message
      if(!id) throw Error()
      res.status(200).json({ message: 'Verified, Please proceed.' })


      
    } catch (error) {
      return res.status(501).json({message: 'Session has expired! Please re-login.'})
    }
  }

  return res.status(500).json({message: "Action not allowed"})
}