const scanner = require('sonarqube-scanner');
scanner(
  {
  serverUrl: "http://localhost:9000",
  token: "squ_ab84ffcef970999bdcac6cff8096a086c8485a34",
  options: {
    "sonar.sources": "./src",
    "sonar.exclusions": "**/test/integration_tests/**, **/test/unit_tests/**",
    "sonar.tests": "./src/test/integration_tests, ./src/test/unit_tests",
    "sonar.test.inclusions": "./src/test/integration_tests/*.test.tsx,./src/test/unit_tests/*.test.tsx",
    "sonar.typescript.lcov.reportPaths": "coverage/lcov.info",
    "sonar.testExecutionReportPaths": "test-report.xml"
  },
},
() => process.exit()
);