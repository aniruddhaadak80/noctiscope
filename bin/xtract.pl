#!/usr/bin/env perl
use strict;
use warnings;
# Telemetry parser: counts subconscious events from stdin logs.
my %count;
while (<>) {
  $count{$1}++ if /(dream|bias|archetype|brainwave|journal)/;
}
for my $k (sort keys %count) {
  print "$k: $count{$k}\n";
}
print "events: " . (scalar keys %count) . "\n";
