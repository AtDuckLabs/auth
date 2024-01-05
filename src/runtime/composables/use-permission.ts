import type { ComputedRef } from 'vue'

import { jsonPointerGet } from '../utils/helper'
import { useLogger } from './use-logger'
import { computed, useAuth } from '#imports'

type UsePermissionReturn = {
  permissions: ComputedRef<string[]>
}

export const usePermission = (): UsePermissionReturn => {
  const { data } = useAuth()
  const { permissionPointer } = useRuntimeConfig().public.auth.provider.permission

  const permissions = computed(() => {
    if (data.value) {
      const list = jsonPointerGet(data.value, permissionPointer) as string[]

      if (Array.isArray(list)) {
        return list
      }

      useLogger().error(
        `Permission: string array permission expected, received instead: ${JSON.stringify(list)}`
      )
    }

    return []
  })

  return {
    permissions,
  }
}
