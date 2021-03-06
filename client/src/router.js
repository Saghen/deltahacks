import { useRoutes } from 'raviger'

import { Base } from '@views/Base'
import { Home } from '@views/Home'
import { Notes } from '@views/Notes'
import { Todos } from '@views/Todos'
export const routes = {
  '/': () => <Home />,
  '/notes': () => <Notes />,
  '/todos': () => <Todos />,
  '/login': () => <Login />,
}

export default () => {
  const routeResult = useRoutes(routes)

  return <Base>{routeResult}</Base>
}
