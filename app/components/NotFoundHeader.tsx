import React from 'react'
import { designSystem } from 'app/lib/design-system'

const NotFoundHeader: React.FC = () => (
  <h1
    className={`${designSystem.spacing.component.header} text-2xl font-semibold tracking-tighter`}
  >
    404 - Page Not Found
  </h1>
)

export default NotFoundHeader
