import { AppContext } from "next/app"
import { getMyRestaurant } from "../app/api/services/restaurant.service"
import { Restaurant } from "../core/interfaces/restaurant.interface"
import { GetStaticPropsContext } from "next"

export default function Test({props}:{props:{data:Restaurant}}) {

    return <>

        <h1>{props?.data.id}</h1>
    </>
}

export const getStaticProps = async (context:GetStaticPropsContext) => {
    console.log(context)
    const res = await getMyRestaurant()
    if (res?.status == 200 && res.data)
        return { props: {data:res.data} }
    else {
        return { props: {
            data:null
        } }
    }
}