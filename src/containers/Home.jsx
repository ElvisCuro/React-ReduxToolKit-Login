

import Banner from '../components/home/Banner'

import Layout from '../hocs/Layout'


export default function Home() {

  return (
    <Layout>
        <div className="text-blue-500">
            <Banner/>
        </div>
    </Layout>
  )
}
