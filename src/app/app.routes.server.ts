import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Parameterized routes must use Server render mode (can't be prerendered without getPrerenderParams)
  { path: 'page/:slug',            renderMode: RenderMode.Server },
  { path: 'products/:id',          renderMode: RenderMode.Server },
  { path: 'dashboard/orders/:id',  renderMode: RenderMode.Server },
  { path: 'admin/orders/:id',      renderMode: RenderMode.Server },

  // Auth-protected routes — render on server per request
  { path: 'dashboard',             renderMode: RenderMode.Server },
  { path: 'dashboard/**',          renderMode: RenderMode.Server },
  { path: 'admin',                 renderMode: RenderMode.Server },
  { path: 'admin/overview',        renderMode: RenderMode.Server },
  { path: 'admin/**',              renderMode: RenderMode.Server },

  // All other routes can be prerendered
  { path: '**',                    renderMode: RenderMode.Prerender },
];
