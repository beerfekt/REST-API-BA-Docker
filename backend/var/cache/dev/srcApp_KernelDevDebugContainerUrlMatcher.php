<?php

use Symfony\Component\Routing\Matcher\Dumper\PhpMatcherTrait;
use Symfony\Component\Routing\RequestContext;

/**
 * This class has been auto-generated
 * by the Symfony Routing Component.
 */
class srcApp_KernelDevDebugContainerUrlMatcher extends Symfony\Bundle\FrameworkBundle\Routing\RedirectableUrlMatcher
{
    use PhpMatcherTrait;

    public function __construct(RequestContext $context)
    {
        $this->context = $context;
        $this->staticRoutes = array(
            '/api/events/list' => array(array(array('_route' => 'app_rest_event_getevens', '_controller' => 'App\\Controller\\Rest\\EventController::getEvens'), null, array('GET' => 0), null, false, null)),
            '/api/events' => array(
                array(array('_route' => 'app_rest_event_addevent', '_controller' => 'App\\Controller\\Rest\\EventController::addEvent'), null, array('POST' => 0), null, false, null),
                array(array('_route' => 'app_rest_event_options', '_controller' => 'App\\Controller\\Rest\\EventController::options'), null, array('OPTIONS' => 0), null, false, null),
            ),
            '/_profiler' => array(array(array('_route' => '_profiler_home', '_controller' => 'web_profiler.controller.profiler::homeAction'), null, null, null, true, null)),
            '/_profiler/search' => array(array(array('_route' => '_profiler_search', '_controller' => 'web_profiler.controller.profiler::searchAction'), null, null, null, false, null)),
            '/_profiler/search_bar' => array(array(array('_route' => '_profiler_search_bar', '_controller' => 'web_profiler.controller.profiler::searchBarAction'), null, null, null, false, null)),
            '/_profiler/phpinfo' => array(array(array('_route' => '_profiler_phpinfo', '_controller' => 'web_profiler.controller.profiler::phpinfoAction'), null, null, null, false, null)),
            '/_profiler/open' => array(array(array('_route' => '_profiler_open_file', '_controller' => 'web_profiler.controller.profiler::openAction'), null, null, null, false, null)),
        );
        $this->regexpList = array(
            0 => '{^(?'
                    .'|/api/events/(?'
                        .'|list/([^/]++)(*:35)'
                        .'|([^/]++)(?'
                            .'|(*:53)'
                            .'|(*:60)'
                        .')'
                    .')'
                    .'|/_(?'
                        .'|error/(\\d+)(?:\\.([^/]++))?(*:100)'
                        .'|wdt/([^/]++)(*:120)'
                        .'|profiler/([^/]++)(?'
                            .'|/(?'
                                .'|search/results(*:166)'
                                .'|router(*:180)'
                                .'|exception(?'
                                    .'|(*:200)'
                                    .'|\\.css(*:213)'
                                .')'
                            .')'
                            .'|(*:223)'
                        .')'
                    .')'
                .')(?:/?)$}sDu',
        );
        $this->dynamicRoutes = array(
            35 => array(array(array('_route' => 'app_rest_event_getevent', '_controller' => 'App\\Controller\\Rest\\EventController::getEvent'), array('eventID'), array('GET' => 0), null, false, null)),
            53 => array(array(array('_route' => 'app_rest_event_updateevent', '_controller' => 'App\\Controller\\Rest\\EventController::updateEvent'), array('eventsID'), array('PUT' => 0), null, false, null)),
            60 => array(array(array('_route' => 'app_rest_event_deleteevent', '_controller' => 'App\\Controller\\Rest\\EventController::deleteEvent'), array('eventID'), array('DELETE' => 0), null, false, null)),
            100 => array(array(array('_route' => '_twig_error_test', '_controller' => 'twig.controller.preview_error::previewErrorPageAction', '_format' => 'html'), array('code', '_format'), null, null, false, null)),
            120 => array(array(array('_route' => '_wdt', '_controller' => 'web_profiler.controller.profiler::toolbarAction'), array('token'), null, null, false, null)),
            166 => array(array(array('_route' => '_profiler_search_results', '_controller' => 'web_profiler.controller.profiler::searchResultsAction'), array('token'), null, null, false, null)),
            180 => array(array(array('_route' => '_profiler_router', '_controller' => 'web_profiler.controller.router::panelAction'), array('token'), null, null, false, null)),
            200 => array(array(array('_route' => '_profiler_exception', '_controller' => 'web_profiler.controller.exception::showAction'), array('token'), null, null, false, null)),
            213 => array(array(array('_route' => '_profiler_exception_css', '_controller' => 'web_profiler.controller.exception::cssAction'), array('token'), null, null, false, null)),
            223 => array(array(array('_route' => '_profiler', '_controller' => 'web_profiler.controller.profiler::panelAction'), array('token'), null, null, false, null)),
        );
    }
}
