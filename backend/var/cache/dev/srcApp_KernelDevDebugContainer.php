<?php

// This file has been auto-generated by the Symfony Dependency Injection Component for internal use.

if (\class_exists(\ContainerExA47Gl\srcApp_KernelDevDebugContainer::class, false)) {
    // no-op
} elseif (!include __DIR__.'/ContainerExA47Gl/srcApp_KernelDevDebugContainer.php') {
    touch(__DIR__.'/ContainerExA47Gl.legacy');

    return;
}

if (!\class_exists(srcApp_KernelDevDebugContainer::class, false)) {
    \class_alias(\ContainerExA47Gl\srcApp_KernelDevDebugContainer::class, srcApp_KernelDevDebugContainer::class, false);
}

return new \ContainerExA47Gl\srcApp_KernelDevDebugContainer(array(
    'container.build_hash' => 'ExA47Gl',
    'container.build_id' => '37ab8f92',
    'container.build_time' => 1558463015,
), __DIR__.\DIRECTORY_SEPARATOR.'ContainerExA47Gl');
