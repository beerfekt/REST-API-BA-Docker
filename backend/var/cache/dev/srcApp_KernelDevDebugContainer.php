<?php

// This file has been auto-generated by the Symfony Dependency Injection Component for internal use.

if (\class_exists(\Container4tNrG7x\srcApp_KernelDevDebugContainer::class, false)) {
    // no-op
} elseif (!include __DIR__.'/Container4tNrG7x/srcApp_KernelDevDebugContainer.php') {
    touch(__DIR__.'/Container4tNrG7x.legacy');

    return;
}

if (!\class_exists(srcApp_KernelDevDebugContainer::class, false)) {
    \class_alias(\Container4tNrG7x\srcApp_KernelDevDebugContainer::class, srcApp_KernelDevDebugContainer::class, false);
}

return new \Container4tNrG7x\srcApp_KernelDevDebugContainer(array(
    'container.build_hash' => '4tNrG7x',
    'container.build_id' => 'dbc147b0',
    'container.build_time' => 1556014364,
), __DIR__.\DIRECTORY_SEPARATOR.'Container4tNrG7x');
