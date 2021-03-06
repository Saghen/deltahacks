import { useRoutes } from 'raviger'

import { Base } from '@views/Base'
import { Home } from '@views/Home'
import { Todos } from '@views/Todos'

export const routes = {
  '/': () => <Home />,
  '/todos': () => <Todos />,
  '/login': () => <Login />,
}

export default () => {
  const routeResult = useRoutes(routes)

  return <Base>{routeResult}</Base>
}
