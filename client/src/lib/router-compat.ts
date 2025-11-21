import { useLocation as useWouterLocation, useRoute } from "wouter";

export { Link } from "wouter";

export function useNavigate() {
  const [, setLocation] = useWouterLocation();
  return (to: string) => setLocation(to);
}

export function useParams<T extends Record<string, string>>(): T {
  const [match, params] = useRoute("/:rest*");
  return (params || {}) as T;
}

export function useLocation() {
  const [location] = useWouterLocation();
  return { pathname: location };
}
