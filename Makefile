JS_COMPILER ?= uglifyjs
SHOW_COMPILE = printf "\033[32mBuilding \033[1m%s\033[0m\n"
EXT_SRC= src/d3-bootstrap.js src/d3-bootstrap-extra.js
ALL_SRC= src/d3-bootstrap.js src/d3-bootstrap-extra.js src/d3-adminlte.js
TARGETS= $(foreach dir, src, $(patsubst $(dir)/%.js,  dist/%.min.js,$(wildcard $(dir)/*.js)))

all: $(TARGETS) dist/d3-bootstrap-all.min.js dist/d3-bootstrap-withextra.min.js

dist/d3-bootstrap-all.js: $(ALL_SRC)
	echo $(ALL_SRC)
	@$(SHOW_COMPILE) $@
	@cat $(ALL_SRC) > $@
dist/d3-bootstrap-withextra.js: $(EXT_SRC)
	@$(SHOW_COMPILE) $@
	@cat $(EXT_SRC) > $@
dist/d3-bootstrap-withextra.min.js: $(EXT_SRC)
	@$(SHOW_COMPILE) $@
	@$(JS_COMPILER) $(EXT_SRC) > $@
dist/d3-bootstrap-all.min.js: $(ALL_SRC)
	@$(SHOW_COMPILE) $@
	@$(JS_COMPILER) $(ALL_SRC) > $@
dist/%.min.js: src/%.js
	@$(SHOW_COMPILE) $@
	@$(JS_COMPILER) < $< > $@

clean:
	@rm dist/*
.phony: all clean
