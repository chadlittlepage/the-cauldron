import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = __ENV.K6_STAGING_URL || 'http://localhost:5173';

export const options = {
  vus: 10,
  duration: '30s',
  thresholds: {
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  // Homepage
  const home = http.get(`${BASE_URL}/`);
  check(home, {
    'homepage returns 200': (r) => r.status === 200,
  });

  sleep(1);

  // Browse page
  const browse = http.get(`${BASE_URL}/browse`);
  check(browse, {
    'browse returns 200': (r) => r.status === 200,
  });

  sleep(1);

  // Charts page
  const charts = http.get(`${BASE_URL}/charts`);
  check(charts, {
    'charts returns 200': (r) => r.status === 200,
  });

  sleep(1);
}
