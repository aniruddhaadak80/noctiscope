name: Bug report
description: Something broken in the observatory
body:
  - type: textarea
    id: what
    attributes:
      label: What happened?
    validations:
      required: true
  - type: textarea
    id: repro
    attributes:
      label: Steps to reproduce
    validations:
      required: true
  - type: input
    id: route
    attributes:
      label: Route (e.g. /dreams)
