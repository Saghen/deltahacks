import { useRoutes } from 'raviger'

import { Base } from '@views/Base'
import { Home } from '@views/Home'

export const routes = {
  '/': () => <Home />,
  '/login': () => <Login />,
  '/logout': () => <Logout />,
  '/admin/:tab': ({ tab }) => <Admin tab={tab} />,
}

export default () => {
  const routeResult = useRoutes(routes)

  return <Base>{routeResult}</Base>
}
