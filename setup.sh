#!/bin/bash
./topics-setup.sh
ksql < kafka-setup.sql
./confluent-setup.sh
