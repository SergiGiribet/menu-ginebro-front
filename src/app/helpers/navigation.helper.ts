export function buildRoute(routeTemplate: string, params: { [key: string]: string | number }): string {
    let finalPath = routeTemplate;
    for (const key in params) {
      finalPath = finalPath.replace(`:${key}`, encodeURIComponent(params[key].toString()));
    }
    return finalPath;
  }
  