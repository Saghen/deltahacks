import { useRoutes } from 'raviger'

import { Base } from '@views/Base'
import { Home } from '@views/Home'
import { Notes } from '@views/Notes'

export const routes = {
  '/': () => <Home />,
  '/notes': () => <Notes />,
  '/login': () => <Login />,
  '/logout': () => <Logout />,
  '/admin/:tab': ({ tab }) => <Admin tab={tab} />,
}

export default () => {
  const routeResult = useRoutes(routes)

  return <Base>{routeResult}</Base>
}
