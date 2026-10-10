#!/usr/bin/env ruby
# frozen_string_literal: true
# Content pipeline: validates docs/diagrams inventory.
require "json"

mmd = Dir.glob("docs/diagrams/*.mmd")
puts "diagrams: #{mmd.length}"
abort "need >= 12 diagrams" if mmd.length < 12
puts "pipeline OK"
