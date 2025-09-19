import React from "react";
import { designSystem } from "app/lib/design-system";

const NotFoundMessage: React.FC = () => (
  <p className={designSystem.spacing.component.section}>The page you are looking for does not exist.</p>
);

export default NotFoundMessage;
